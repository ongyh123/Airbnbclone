'use client';

import axios from 'axios';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { useCallback, useState } from 'react';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import { ok } from 'assert';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  //establish form control function
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //establish onSubmit function
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }

    });
  };

  //   const onToggle = useCallback(() => {
  //     registerModal.onClose();
  //     loginModal.onOpen();
  //   }, [registerModal, loginModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login to your account!' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => {}}
        //   onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => {}}
        //   onClick={() => signIn('github')}
      />
      <div
        className='
            text-neutral-500
            text-center
            mt-4
            font-light
          '
      >
        <p>
          Already have an account?
          <span
            onClick={registerModal.onClose}
            className='
                text-neutral-800
                cursor-pointer
                hover:underline
              '
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      // if is loading, we don't want the user to change anything in the modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;