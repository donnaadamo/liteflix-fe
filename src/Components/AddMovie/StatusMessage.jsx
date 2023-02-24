import Logo from "../Logo/Logo";

const StatusMessage = ({ header, title, text, error }) => {
  return (
    <>
      <div className="addmovie__content__body__logo">
        <Logo />
      </div>
      <div className="addmovie__content__body__congrats">{header}</div>
      <div className="addmovie__content__body__uploaded">
        {error ? text : `${title} ${text}`}
      </div>
    </>
  );
};

export default StatusMessage;
