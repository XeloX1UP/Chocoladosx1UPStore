export async function sendEmail({
  emailTo,
  subject,
  fromEmail,
  message,
  type,
}: {
  emailTo: string;
  subject: string;
  fromEmail: string;
  message: string;
  type: "text" | "html";
}) {
  const url = "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "9bb503dfb9mshc6e439abb072cc0p1d1a87jsn33ed5e9fac56",
      "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: emailTo,
            },
          ],
          subject: subject,
        },
      ],
      from: {
        email: fromEmail,
      },
      content: [
        {
          type: `text/${type}`,
          value: message,
        },
      ],
    }),
  };
  await fetch(url, options);
}
