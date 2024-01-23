const nodemailer = require('nodemailer')
class contactController {
    async showContact(req, res, next) {
        try {
            res.render("common/contact");
        } catch (error) {
            next(error);
        }
    }
    async sendEmail(req, res, next) {
        console.log(req.body);
        const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
          <li>Name: ${req.body.firstname} ${req.body.lastname}</li>
          <li>Email: ${req.body.email}</li>
          <li>Phone: ${req.body.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
      `;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            // host: 'mail.YOURDOMAIN.com',
            service: 'gmail',
            auth: {
                user: 'leminhhoang123456le@gmail.com',
                pass: 'ookjlchwjyswrjgq' // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'leminhhoang123456le@gmail.com', // sender address
            to: 'leminhhoang123456le@gmail.com', // list of receivers
            subject: 'Contact Request', // Subject line
            //text: 'Hello world?', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({ msg: 'Internal Server Error' })
            }
            // console.log('Message sent: %s', info.messageId);
            //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            //res.render('home', { msg: 'Email has been sent' });
            return res.status(200).json({ msg: 'success' });

        });
    }
}
module.exports = new contactController();