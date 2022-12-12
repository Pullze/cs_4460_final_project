export default function ToolTip(props) {
  if (props.data === null) {
    return null;
  }

  return (
    <div
      style={{
        left: props.data.xPos,
        top: props.data.yPos,
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: "4px",
        color: "white",
        fontSize: "12px",
        padding: "4px",
        marginLeft: "15px",
        transform: "translateY(-50%)",
        zIndex: 999
      }}
    >
      {props.data.name}
    </div>
  );
}