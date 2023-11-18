import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const userSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	username:z.string().min(1,'Username is required').max(20),
	password: z
	  .string()
	  .min(1, 'Password is required')
	  .min(8, 'Password must have than 8 characters'),
  });


export async function POST(
	req:Request
)  {
	try {
		const body = await req.json();
		const {email , username , password} = userSchema.parse(body);

		const existingUserbyEmail = await db.user.findUnique({
			where:{
				email:email
			}
		});

		if(existingUserbyEmail){
			return NextResponse.json({user:null,message:"email exists"},{status:409});

		}
		const hashedPassword = await hash(password,10);
		const newUser = await db.user.create({
			data:{
				email,
				username,
				password:hashedPassword
			},
		})
		return NextResponse.json({user: newUser , message:"User created !!"},{status:201});

	} catch (error) {
		console.log("[AUTH_POST] : ",error);
		return NextResponse.json({ message:"something went wrong !!"},{status:500});
	}
}
 
