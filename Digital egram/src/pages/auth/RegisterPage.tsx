import React from 'react';
import Layout from '../../components/common/Layout';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default RegisterPage;