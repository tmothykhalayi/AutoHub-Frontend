// hooks/usePayment.ts
import { createPayment, verifyPayment } from '@/api/payment';
import { useMutation } from '@tanstack/react-query';

export const useCreatePayment = (amount: string) => {
  return useMutation({
    mutationFn: () => createPayment({ amount }),
    onSuccess: (data) => {
      console.log('Payment created successfully:', data);
    },
    onError: (error: Error) => {
      console.error('Payment error:', error.message);
    },
  });
};

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: (reference: string) => verifyPayment(reference),
    onSuccess: (data) => {
      console.log('Payment verified successfully:', data);
    },
    onError: (error: Error) => {
      console.error('Verification error:', error.message);
    },
  });
};