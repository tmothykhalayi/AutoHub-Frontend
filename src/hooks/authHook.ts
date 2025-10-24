import { disableTotp, loginFn, registerFn, resetPasswordFn, sendCodeMail, setupTotp, verifyCodeMail, verifyTotpMail } from "@/api/auth"
import { loginUserHelper } from "@/lib/authHelper"
import type { ApiResponse, LoginDataType, LoginResponseType, RegisterDataTypeT, RegisterResponseType, } from "@/util/types"
import { useMutation, useQuery, useQueryClient, type UseQueryOptions, } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"

// useLoginHook
export const useLoginHook = (handleRedirect:()=>void) => {

  return useMutation<LoginResponseType, Error, LoginDataType>({
    mutationKey: ['login'],
    mutationFn: loginFn,
    onSuccess: (data: LoginResponseType) => {
      console.log('data from login api', data)
      if (data?.status === 'success') {
        const userData = data.data;
        loginUserHelper(data.data.tokens, userData.user)
        // loginUser(data.logi.tokens,data.data.user)
        handleRedirect()
        // loginUser(data.data.tokens, {isVerified:true,user:data.data.user})
        toast.success('Login successful');
      } else {
        toast.error(data?.message || 'Login failed');
      }
    },
    onError: (error) => {
      console.error('Error occurred', error);
      toast.error(error.message || 'An error occurred during login');
    }
  });
};

// useRegisterHook
export const useRegisterHook = () => {
  const navigate = useNavigate();
  return useMutation<RegisterResponseType, Error, RegisterDataTypeT>({
    mutationKey: ['register'],
    mutationFn: registerFn,
    onSuccess: (data) => {
      if (data.status == 'success') {
        toast.success('Registration success!!Now you can login.')
        navigate({ to: '/login' })
      } else if (data.status == 'error') {
        console.log(data)
        toast.error(data.message)
      }
    },
    onError: (error) => {
      console.error('register error', error.message)
    }
  })
}

interface dataT {
  oldPassword: string;
  newPassword: string
  userID: string
}

export const useResetPassword = () => {
  return useMutation<ApiResponse<null>, Error, dataT>({
    mutationFn: (data: dataT) =>
      resetPasswordFn({ id: data.userID, newPassword: data.newPassword, oldPassword: data.oldPassword }),
  })
};

export const useSendMailCode = () => {
  return useMutation({
    mutationFn: (email: string) => sendCodeMail(email)
  })
}
export const useVerifyMailCode = () => {
  return useMutation({
    mutationFn: (code: string) => verifyCodeMail(code)
  })
}


interface UseCreateTotpOptions extends Omit<UseQueryOptions<
  Awaited<ReturnType<typeof setupTotp>>,
  Error,
  Awaited<ReturnType<typeof setupTotp>>,
  ['totp']
>, 'queryKey' | 'queryFn'> { }

export const useCreateTotp = (options?: UseCreateTotpOptions) => {
  return useQuery({
    queryFn: setupTotp,
    queryKey: ['totp'],
    gcTime: 0,
    staleTime: 0,
    ...options
  });
};

export const useVerifyTotp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['totp'],
    mutationFn: (code: string) => verifyTotpMail(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}

export const useDisableTotp = () => {
  return useMutation({
    mutationKey: ['totp'],
    mutationFn: disableTotp,
  })
}

