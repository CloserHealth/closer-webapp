import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import useAppTheme from "@/hooks/theme.hook";


interface Drawer {
  children: React.ReactNode;
  drawer: boolean;
  toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  anchor?: "right" | "left" | "top" | "bottom";
}

const Drawer: React.FC<Drawer> = ({
  children,
  drawer,
  toggleDrawer,
  anchor,
}) => {
    const isMobile = useAppTheme();

  return (
    <>
      <SwipeableDrawer
        anchor={anchor}
        open={drawer}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        PaperProps={{
          sx: {
            // width: { sm: "50%", md: "50%", lg: "100%" },
            width: `${isMobile ? "450px" : "30%"}`,
            overflowY: "hidden",
            padding: "24px"
          },
        }}
      >
        {children}
      </SwipeableDrawer>
    </>
  );
};

export default Drawer;