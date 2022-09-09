module.exports = ({ content, styles, font = "" }) => {
  let newStyles = "";
  if (styles) {
    newStyles = styles.map((style) => {
      return `<link rel="stylesheet" href="${style}" />`;
    });
    newStyles.join("");
  }
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${newStyles}
    ${font}
    <title>Eğitim</title>
  </head>
  <body>
    ${content}
  </body>
  </html>`;
};
