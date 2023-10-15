import { catchAsync } from "@/helpers/api.helper";
import useRequest from "@/services/request.service";
import { profileUpdateAction } from "@/store/profile.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { sanitiseFormData } from "@/helpers";
import toast from "react-hot-toast";
import API from "@/constants/api.constant";

const useSignupController = () => {
  const dispatch = useDispatch();
  const { isLoading, makeRequest } = useRequest();
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
      setOpenModal(true);
  }
  const handleCloseModal = () => {
      setOpenModal(false);
  }

  // Navigate to Login
  const goToLogin = () => {
      router.push('/login');
  }

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleFirstNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setFirstName(event.target.value);
  };

   const handleLastNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setLastName(event.target.value);
  };

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setEmail(event.target.value);
  };

  const handlePasswordChange = (event: {
      target: { value: React.SetStateAction<string> };
  }) => {
      setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
}) => {
    setConfirmPassword(event.target.value);
};


  // Validation rules for the name, email and Password inputs
  const isFirstNameValid = firstName.length > 3;
  const isLastNameValid = lastName.length > 3;
  const isEmailValid = email.length > 5 && email.includes('@');
  const isPasswordValid = password.length > 3;
  const isConfirmPasswordValid = confirmPassword.length > 3;
  const passwordValidation = password === confirmPassword;

  const signupData = {
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: password,
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    catchAsync(
      async () => {
        const res = await makeRequest({
          method: "POST",
          url: API.register,
          data: signupData,
        });

        const { message, data } = res.data;
        const user = {
          data,
          accessToken: data.token,
        };

        if (message === "Registration successful!") {
          toast.success(message);
          router.push("/verification");
        }

        dispatch(profileUpdateAction(user));
      },
      (err: any) => {
        console.log(err);
      }
    );
  };

  const goBack = () => {
    router.back();
  }

  return {
    goBack,
    onSubmit,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleEmailChange,
    handleFirstNameChange,
    handleLastNameChange,
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    isPasswordValid,
    isConfirmPasswordValid,
    isEmailValid,
    isLoading,
    goToLogin,
    isFirstNameValid,
    isLastNameValid,
    openModal,
    setOpenModal,
    handleCloseModal,
    handleOpenModal,
    router,
    passwordValidation,
  };
};

export default useSignupController;
