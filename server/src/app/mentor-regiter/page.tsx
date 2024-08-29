// app/mentor-register/page.tsx

import { redirect } from 'next/navigation';
import { prisma } from '@/services/prisma'; 
import bcrypt from 'bcrypt';

export default async function MentorRegStudentPage() {
  const handleSubmit = async (formData: FormData) => {
    'use server'; // Indicates this function runs on the server side

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = Math.random().toString(36).slice(-8); // Generate a random password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user in the database
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'STUDENT', 
      },
    });

    redirect('/success'); // Redirect after successful registration
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Register Student</h2>
        <form action={handleSubmit} method="post">
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
