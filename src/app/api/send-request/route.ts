import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};


export async function POST(request: Request) {

  const data = await request.formData();
  
  // Chuyển đổi formData sang object
  const formData: Record<string, any> = {};

  // Sử dụng Promise.all để xử lý bất đồng bộ
  await Promise.all(Array.from(data.entries()).map(async ([key, value]) => {
    formData[key] = value;
  }));

  // Lấy file-upload (có thể nhiều file)
  const attachments: any[] = [];
  await Promise.all(Array.from(data.entries()).map(async ([key, value]) => {
    if (key === 'file-upload' && value instanceof File) {
      const buffer = await value.arrayBuffer();
      attachments.push({
        filename: value.name,
        content: Buffer.from(buffer),
        contentType: value.type
      });
    } else {
      formData[key] = value;
    }
  }));

  try {
    const currentYear = new Date().getFullYear();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // HTML cho email người dùng
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border-radius: 8px;">
        <div style="display: inline-block;">
          <img src="${process.env.NEXT_PUBLIC_BASEURL}/email-logo.png" alt="Logo" style="width: 200px;" />
        </div>
        <h2 style="color: #B38E41;">Confirmation de votre demande de devis</h2>
        <p>Bonjour ${formData.firstName} ${formData.surname},</p>
        <p>Nous avons bien reçu votre demande de devis. Voici un résumé de vos informations :</p>
        <ul>
          <li><strong>Description :</strong> ${formData.description}</li>
          <li><strong>Date souhaitée :</strong> ${formData.date}</li>
          <li><strong>Budget :</strong> ${formData.budget}</li>
        </ul>
        <h3>Vos coordonnées :</h3>
        <ul>
          <li><strong>Prénom :</strong> ${formData.firstName}</li>
          <li><strong>Nom :</strong> ${formData.surname}</li>
          <li><strong>Téléphone :</strong> +${formData.phonePrefix} ${formData.phone}</li>
          <li><strong>Email :</strong> ${formData.email}</li>
          <li><strong>Code postal :</strong> ${formData.postalCode}</li>
          <li><strong>Ville :</strong> ${formData.city}</li>
          <li><strong>Numéro :</strong> ${formData.houseNumber}</li>
          <li><strong>Rue :</strong> ${formData.street}</li>
        </ul>
        <p>Consentement à la politique de confidentialité : <strong>${formData.privacyPolicy === 'true' ? 'Oui' : 'Non'}</strong></p>
        <hr style="border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="color: #999;">© ${currentYear} NextImmo. Tous droits réservés.</p>
      </div>
    `;

    // HTML cho email admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border-radius: 8px;">
        <div style="display: inline-block;">
          <img src="${process.env.NEXT_PUBLIC_BASEURL}/email-logo.png" alt="Logo" style="width: 200px;" />
        </div>
        <h2 style="color: #B38E41;">Nouvelle demande de devis reçue</h2>
        <ul>
          <li><strong>Description :</strong> ${formData.description}</li>
          <li><strong>Date souhaitée :</strong> ${formData.date}</li>
          <li><strong>Budget :</strong> ${formData.budget}</li>
        </ul>
        <h3>Coordonnées du client :</h3>
        <ul>
          <li><strong>Prénom :</strong> ${formData.firstName}</li>
          <li><strong>Nom :</strong> ${formData.surname}</li>
          <li><strong>Téléphone :</strong> +${formData.phonePrefix} ${formData.phone}</li>
          <li><strong>Email :</strong> ${formData.email}</li>
          <li><strong>Code postal :</strong> ${formData.postalCode}</li>
          <li><strong>Ville :</strong> ${formData.city}</li>
          <li><strong>Numéro :</strong> ${formData.houseNumber}</li>
          <li><strong>Rue :</strong> ${formData.street}</li>
        </ul>
        <p>Consentement à la politique de confidentialité : <strong>${formData.privacyPolicy === 'true' ? 'Oui' : 'Non'}</strong></p>
        <hr style="border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="color: #999;">© ${currentYear} NextImmo. Tous droits réservés.</p>
      </div>
    `;

    // Gửi email
    await transporter.sendMail({
      from: 'NextImmo <noreply@nextimmo.lu>',
      to: formData.email.toString(),
      subject: 'Confirmation de votre demande de devis',
      html: userEmailHtml,
      attachments
    });
    await transporter.sendMail({
      from: 'NextImmo <noreply@nextimmo.lu>',
      to: process.env.ADMIN_EMAIL?.toString(),
      subject: 'Nouvelle demande de devis',
      html: adminEmailHtml,
      attachments
    });

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json({ 
      message: 'Error sending emails', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  } 
}

