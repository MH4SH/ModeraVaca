const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = {
	_header: () => {
		return {
			html: '<center><h2><strong>ModeraVaca</strong></h2>',
			text: 'ModeraVaca \n'
		};
	},
	_footer: () => {
		return {
			html: '<br /><strong>for ModeVaca</strong></center>',
			text: '\n\nfor ModeVaca'
		};
	},
	noReplay: async ({to, subject, html, text}) => {
		const msg = {
			to,
			from: 'ModeraVaca <noreply@moderavaca.mh4sh.dev>',
			subject,
			text: `${sendEmail._header().text}${text}${sendEmail._footer().text}`,
			html: `${sendEmail._header().html}${html}${sendEmail._footer().html}`,
		  };

		  await sgMail
		  .send(msg);
	}
};

module.exports = sendEmail;