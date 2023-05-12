// tftpController.js

const TftpServer = require('tftp-server');
const fs = require('fs');

const uploadFile = async (req, res) => {
    console.log("req",req.query)
    console.log("req",req.file);
  const { ip } = req.query;
  const file = req.file;

  if (!ip || !file) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const server = new TftpServer({ host: ip });
  console.log("server",server);
  
  server.on('WRQ', (req, res) => {
    const writeStream = fs.createWriteStream(file.path);

    writeStream.on('finish', () => {
      res.end();
      server.close();
      fs.unlinkSync(file.path); // Silinebilir, isteğe bağlıdır
      console.log(`File uploaded to ${ip}`);
    });

    req.pipe(writeStream);
  });

  server.listen();

  return res.status(200).json({ message: 'File upload initiated' });
};

module.exports = {
  uploadFile,
};
