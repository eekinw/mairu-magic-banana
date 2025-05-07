type HeaderProps = {
  onTitleClick?: () => void;
};

const Header = ({ onTitleClick }: HeaderProps) => (
  <header className="w-full p-4 border-b-2 border-gray-400">
    <span
      className="text-xl font-bold hover:text-yellow-500 transition-colors cursor-pointer"
      onClick={onTitleClick}
    >
      ひとりマジカルバナナ　🍌
    </span>
  </header>
);

export default Header;
