import logoImg from "@/assets/logo.jpeg";

const AppLogo = ({ size = 40, onClick, className = '' }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center cursor-pointer ${className}`}
    >
      <img
        src={logoImg}
        alt="DSTP Technology Private Limited"
        style={{ width: size, height: size }}
        className="rounded-full object-cover"
      />
    </div>
  );
};

export default AppLogo;