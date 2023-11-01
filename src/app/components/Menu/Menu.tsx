import { Menu, MenuItem } from "@mui/material";

export const UserMenu = ({
    anchorEl,
    open,
    handleClose,
    onDelete,
  }: {
    anchorEl: any;
    open: boolean;
    handleClose: any;
    onDelete: any;
  }) => {
    return (
      <Menu
        anchorEl={anchorEl}
        id="self-persona-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '12px',
            overflow: 'visible',
            boxShadow: '0px 4px 14px rgba(57, 39, 104, 0.36)',
            // mt: 1.5,
            // ml: -1,
            width: 'auto',
            padding: '0px 20px 0px 10px',
            mt: 3,
          },
        }}
        anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
      >
        <MenuItemItem
          onClick={() => {}}
          icon={''}
          title="Add Symptom"
        />
        <MenuItemItem
          onClick={() => {}}
          icon={''}
          title="Edit Symptom"
        />
        <MenuItemItem onClick={() => {}} icon={''} title="Delete Symptom" />
      </Menu>
    );
  };
  
  export const MenuItemItem = ({
    onClick,
    icon,
    title,
    color,
  }: {
    icon: React.ReactNode;
    title: string;
    onClick: any;
    color?: string;
    [key: string]: any;
  }) => {
    return (
      <MenuItem onClick={onClick}>
        <div className="w-full h-[20px] flex justify-start items-center gap-[8px]">
          {icon}
  
          <span className={'font-[500] text-[3vw] sm:text-[14px] text-[#747A8B]'} style={{ color }}>
            {title}
          </span>
        </div>
      </MenuItem>
    );
  };