import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../../config/axios.config';

const PaymentScreen = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [message, setMessage] = useState('Processing payment...');

  useEffect(() => {
    const vnpResponseCode = queryParams.get('vnp_ResponseCode');
    const vnpTxnRef = queryParams.get('vnp_TxnRef');
    const vnpSecureHash = queryParams.get('vnp_SecureHash');
    const vnpAmount = queryParams.get('vnp_Amount');
    const vnpOrderInfo = queryParams.get('vnp_OrderInfo');

    apiClient
      .get('api/payment/vnpay-return', {
        params: {
          vnp_ResponseCode: vnpResponseCode,
          vnp_TxnRef: vnpTxnRef,
          vnp_SecureHash: vnpSecureHash,
          vnp_Amount: vnpAmount,
        },
      })
      .then((response) => {
        switch (vnpResponseCode) {
          case '00':
            setPaymentStatus('success');
            setMessage('Payment successful');
            break;
          case '11':
            setPaymentStatus('failed');
            setMessage('Transaction failed due to payment timeout');
            break;
          case '24':
            setPaymentStatus('cancelled');
            setMessage('Transaction cancelled by customer');
            break;
          case '65':
            setPaymentStatus('failed');
            setMessage(
              'Transaction failed due to daily transaction limit exceeded',
            );
            break;
          case '75':
            setPaymentStatus('failed');
            setMessage('Payment service is under maintenance');
            break;
          case '07':
            setPaymentStatus('failed');
            setMessage(
              'Transaction successful but suspicious (fraud detection)',
            );
            break;
          case '09':
            setPaymentStatus('failed');
            setMessage(
              'Transaction failed due to customer not registered for Internet Banking',
            );
            break;
          case '10':
            setPaymentStatus('failed');
            setMessage(
              'Transaction failed due to incorrect card/account details',
            );
            break;
          case '51':
            setPaymentStatus('failed');
            setMessage('Insufficient funds in the account');
            break;
          default:
            setPaymentStatus('unknown');
            setMessage('Unknown payment status');
        }
      })
      .catch((error) => {
        console.error('Error calling /vnpay-return:', error);
        setPaymentStatus('failed');
        setMessage('Error processing payment');
      });
  }, [location, queryParams]);

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'success':
        return (
          <div className='text-green-500 font-semibold'>
            Your payment was successful! Thank you for your purchase.
          </div>
        );
      case 'failed':
        return (
          <div className='text-red-500 font-semibold'>
            There was an issue with your payment. Please try again later.
          </div>
        );
      case 'cancelled':
        return (
          <div className='text-yellow-500 font-semibold'>
            Your payment has been cancelled. If this was an error, please try
            again.
          </div>
        );
      case 'unknown':
        return (
          <div className='text-gray-500 font-semibold'>
            We couldn&apos;t determine the payment status. Please contact
            support if the issue persists.
          </div>
        );
      default:
        return (
          <div className='text-gray-500 font-semibold'>
            We&apos;re processing your payment. Please wait...
          </div>
        );
    }
  };

  return (
    <div className='flex justify-center items-center h-[50vh] bg-gray-100'>
      <div className='text-center p-8 bg-white rounded shadow-lg'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>{message}</h2>
        {getStatusMessage()}
      </div>
    </div>
  );
};

export default PaymentScreen;
