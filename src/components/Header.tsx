type HeaderProps = {
  onTitleClick?: () => void;
};

const Header = ({ onTitleClick }: HeaderProps) => (
  <header className="w-full p-4 border-b border-gray-200">
    <span
      className="text-xl font-bold hover:text-blue-500 transition-colors cursor-pointer"
      onClick={onTitleClick}
    >
      ひとりマジカルバナナ
    </span>
  </header>
);

export default Header;
