const QRCode = require('qrcode');
const app = require('express')()
app.get('/:data', (req, res) => {
    QRCode.toDataURL(req.params.data, { version: 4 }, function (err, url) {
        if (err) {
            return res.status(400).send(err.message)
        }
        const im = url.split(",")[1];
        const img = Buffer.from(im, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
    })
})
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('server started at ' + port);
})