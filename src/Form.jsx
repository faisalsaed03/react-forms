import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; // Fixed import statement

export default function Form() {
  const schema = yup.object().shape({
    fullName: yup.string().required("Your Full Name is required"), 
    email: yup.string().email('Must be a valid email').required('Email is required'),
    age: yup.number().positive('Age must be a positive number').integer('Age must be an integer').min(18, 'Must be at least 18').required('Age is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters').max(20, 'Password cannot exceed 20 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const { register, handleSubmit , formState:{errors} } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='ctn'>
      <form onSubmit={handleSubmit(onSubmit)} className='frm'>
        <input type="text" placeholder='Full Name' {...register("fullName")} />
        <p>{errors.fullName?.message}</p>

        <input type="text" placeholder='Email' {...register("email")} />
        <p>{errors.email?.message}</p>

        <input type="number" placeholder='Age' {...register("age")} />
        <p>{errors.age?.message}</p>

        <input type="password" placeholder='Password...' {...register("password")} />
        <p>{errors.password?.message}</p>

        <input type="password" placeholder='Confirm Password' {...register("confirmPassword")} />
        <p>{errors.confirmPassword?.message}</p>

        <input type="submit" />
      </form>
    </div>
  );
}
