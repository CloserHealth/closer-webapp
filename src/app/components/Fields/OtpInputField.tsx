import OtpInput from 'react-otp-input';
import { alpha } from '@mui/material';

const OtpInputField = ({
  value,
  onChange,
  error,
  className,
  ...props
}: {
  value: string;
  onChange: any;
  error?: string | boolean;
  className?: any;
  [key: string]: any;
}) => (
  <>
    <OtpInput
      value={value}
      onChange={onChange}
      numInputs={4}
      renderSeparator={<span>&nbsp;&nbsp;&nbsp;</span>}
      renderInput={(props) => <input {...props} />}
      shouldAutoFocus={true}
      containerStyle={{
        // gap: 6,
        justifyContent: 'space-between',
      }}
      // errorStyle={{
      //   border: `1px solid ${alpha('#A71F0D', 0.5)}`,
      // }}
      // focusStyle={{
      //   border: '1px solid #5CB67F',
      // }}
      inputStyle={{
        width: '50px',
        height: '56px',
        background: '#F4F4F6',
        // borderBottom: '1px solid #e3e3e3',
        borderRadius: "10px",
        outline: 'none',
        fontWeight: '600',
        fontSize: '20px'
      }}
      {...props}
    />

    {error && <small className="text-[11px] text-errorColor">{error}</small>}
  </>
);

export default OtpInputField;
