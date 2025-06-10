function Footer({ mode }) {
  const bgColor = mode === "dark" ? "dark-theme" : "light-theme";
  const textColor = mode === "dark" ? "dark-theme" : "light-theme";

  return (
    <div
      className={`d-flex justify-content-center align-items-center ${bgColor} footer`}
      style={{ height: '60px' }}
    >
      <p className={`mb-0 text-center ${textColor}`}>&copy; 2025 Sohail Shaik</p>
    </div>
  );
}

export default Footer;
