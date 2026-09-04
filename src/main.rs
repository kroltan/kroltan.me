use std::fs::{File, OpenOptions};
use color_eyre::{Result, eyre::Context};
use std::io::Read;
use std::path::PathBuf;

mod xml;

pub(crate) enum Action {
    Transform {
        stream: Box<dyn Read>,
        destination: PathBuf,
    },
    Copy,
    Skip,
}

fn main() -> Result<()> {
    let workdir = std::env::current_dir()?;
    let prefix = PathBuf::from("static");

    for path in glob::glob("static/**/*")? {
        let mut path = path?;

        let action = match path.extension().unwrap_or_default().as_encoded_bytes() {
            b"xml" => xml::apply_xml_stylesheet(&path)
                .with_context(|| path.to_string_lossy().into_owned())?,
            _ => if path.is_dir() {
                continue
            } else {
                Action::Copy
            },
        };

        let mut stream = match action {
            Action::Transform { stream, destination } => {
                path = destination;
                stream
            },
            Action::Copy => Box::new(File::open(&path).context("copy file")?),
            Action::Skip => continue,
        };

        let mut output = workdir.clone();
        output.push("build");
        output.push(path.strip_prefix(&prefix)?);

        if let Some(directory) = output.parent() {
            std::fs::create_dir_all(directory)?;
        }

        let mut output = OpenOptions::new()
            .create(true)
            .write(true)
            .truncate(true)
            .open(&output)
            .with_context(|| output.to_string_lossy().into_owned())?;

        std::io::copy(&mut stream, &mut output)?;
    }

    Ok(())
}
