import { catchAsync } from "@/helpers/api.helper";
import useRequest from "@/services/request.service";
import { profileLoginAction } from "@/store/profile.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { sanitiseFormData } from "@/helpers";
import toast from "react-hot-toast";
import API from "@/constants/api.constant";
import useGlobalState from "@/hooks/globalstate.hook";

const useLoginController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, makeRequest } = useRequest();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const {profile} = useGlobalState();

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  // Validation rules for the Password and email inputs
  const isPasswordValid = password.length > 3;
  const isEmailValid = email.length > 5 && email.includes("@");

  const loginData = {
    email: email,
    password: password,
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    catchAsync(
      async () => {
        const res = await makeRequest({
          method: "POST",
          url: API.login,
          data: loginData,
        });

        const { message, data } = res.data;
        const user = {
          data,
          accessToken: data?.token,
        };

        if (message === "Login successful!") {
          toast.success(message);
          router.push("/dashboard");
        }

        dispatch(profileLoginAction(user));
      },
      (err: any) => {
        console.log(err);
      }
    );
  };

  const goToSignup = () => {
    router.push('/signup');
  };

  const goBack = () => {
    router.back();
  }

  return {
    goBack,
    goToSignup,
    onSubmit,
    isLoading,
    handlePasswordChange,
    handleEmailChange,
    password,
    email,
    isPasswordValid,
    isEmailValid,
  };
};

export default useLoginController;
