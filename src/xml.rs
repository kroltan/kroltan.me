use color_eyre::{Result, eyre::WrapErr};
use libxml::parser::Parser;
use libxml::tree::{Document, Node};
use std::{
    fs::File,
    io::Read,
    path::Path,
};
use color_eyre::eyre::{eyre, OptionExt};
use crate::Action;

pub fn apply_xml_stylesheet(path: impl AsRef<Path>) -> Result<Action> {
    fn load_file(parser: &Parser, file: &mut File) -> Result<Document> {
        let mut text = Vec::new();
        file.read_to_end(&mut text)?;

        Ok(parser.parse_string(text)?)
    }

    let mut file = File::open(&path)?;

    let parser = Parser::default();

    let source = load_file(&parser, &mut file).context("failed to load XML source file")?;

    let Some(stylesheet) = find_stylesheet_declaration(&source.as_node())? else {
        return Ok(Action::Copy);
    };

    let mut stylesheet = libxslt::parser::parse_file(&stylesheet).map_err(|msg| eyre!("libxslt: {msg}"))?;
    let output = stylesheet.transform(source, vec![]).map_err(|msg| eyre!("libxslt: {msg}"))?;
    
    let mut destination = path.as_ref().to_owned();
    destination.set_extension("html");

    Ok(Action::Transform {
        stream: Box::new(std::io::Cursor::new(output.to_string())),
        destination
    })
}

fn find_stylesheet_declaration(source: &Node) -> Result<Option<String>> {
    let values = source.findvalues("/processing-instruction('xml-stylesheet')")
        .ok()
        .ok_or_eyre("xpath error")?;

    for value in values {
        let Some((_, value)) = value.split_once("href=\"") else {
            continue;
        };

        let Some((href, _)) = value.split_once("\"") else {
            continue;
        };

        return Ok(Some(href.into()));
    }

    Ok(None)
}
