import { style } from "@vanilla-extract/css";

export const sidePanelContainer = style({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: 0,
  right: 0,
  width: "20%",
  height: "100%",
  backgroundColor: "white",
  boxShadow: "-5px 0px 57px 2px rgba(118, 118, 128, 0.12)",
  borderRadius: "16px 0 0 16px",
  padding: "20px 8px",
});

export const sidePanelSection = style({
  display: "flex",
  width: "100%",
  gap: "16px",
  padding: "20px 0",
});

export const sidePanelShapeButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
});
