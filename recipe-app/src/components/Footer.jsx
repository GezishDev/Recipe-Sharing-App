const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} RecipeShare. Built with React &
          Firebase.
        </p>
        <p className="mt-2">
          <a
            href="https://yourportfolio.com"
            className="text-orange-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gezahegn Abera
          </a>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
