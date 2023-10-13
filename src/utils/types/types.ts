// Text Field props
export interface TextFieldProps {
    label: string;
    placeholder: string;
    value: any;
    id: string;
    type: string;
    require: boolean;
    isPassword: boolean;
    withBackground: boolean;
    onInputChange: any;
    readOnly: boolean;
}

// Search Field props
export interface SearchFieldProps {
    placeholder: string;
    value: any;
    id: string;
    type: string;
    onInputChange: any;
}

// Text Field props
export interface TextAreaFieldProps {
    label: string;
    placeholder: string;
    value: any;
    id: string;
    require: boolean;
    onInputChange: any;
    padding: any;
}

// Auth Button Props
export interface AuthButtonProps {
    content: string;
    isDisabled: boolean;
    type: any;
    isLoading: any;
}

// App Button Props
export interface AppButtonProps {
    content: string;
    onClickButton: () => void;
    isRounded: boolean;
    isLoading: any;
    type: any;
    isDisabled: boolean;
}

export interface OutlinedButtonProps {
    content: string;
    onClickButton: () => void;
    isRounded: boolean;
}

// Close App Button Props
export interface CloseAppButtonProps {
    content: string;
    onClickButtonClose: () => void;
}

// Modal Props
export interface ModalProps {
    header: string;
    text: string;
    buttonText: string;
    onClick: () => void;
    onClose: () => void;
}

// Question base Modal Props
export interface QuestionBaseModalProps {
    text: string;
    buttonText: string;
    buttonTextClose: string;
    onClick: () => void;
    onClose: () => void;
}

// Question base Modal Props
export interface StatusModalProps {
    text: string;
    header: string;
    icon: any;
    onClose: () => void;
}


// Success Modal Props
export interface SuccessModalProps {
    text: string;
    buttonText: string;
    buttonTextClose: string;
    onClick: () => void;
    onClose: () => void;
}

// Sidebar
export interface SideBarItemLink {
    name: string;
    icon: any;
    to: string;
    paths: string[];
  }

  // Sidebar
export interface SideBarItemLink {
    name: string;
    icon: any;
    to: string;
    paths: string[];
}

// CardProps
export interface CardProps {
    bgColor: string;
    title: string;
    data: any;
    iconPath: any;
    isLoading: boolean;
}


// Phases Props
export interface PhasesProps {
    id: number;
    name: string;
    tips: number;
    link: string;
}

// Phase Props
export interface PhaseProps {
    header: string;
    onClickButton: () => void;
}

// Community Props
export interface CommunityProps {
    id: number;
    name: string;
    createdBy: string;
    member: number;
    status: string;
}

// Tab Props
export interface TabProps {
    title: string;
    activeTab: any;
    tab: any;
    onHandle: () => void;
}

// Admin Props
export interface AdminProps {
    imagePath: any;
    name: string;
}

// Project Props
export interface ProjectProps {
    imagePath: any;
    description: string;
    title: string;
    percentage: number;
    donationPoint: number;
    donatedPoint: number;
    donor: number;
}

// AdminsProps
export interface AdminsProps {
    id: number;
    name: string;
    email: string;
    status: string;
    date: string
}