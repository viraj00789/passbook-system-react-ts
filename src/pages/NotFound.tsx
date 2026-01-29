import notFound from "../assets/404-not-found.png";
import { Button } from "../components/ui/Button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <img src={notFound} alt="404" loading="lazy" />

      <div className="text-center space-y-6">
        <h1 className="text-4xl text font-extrabold">Something went wrong.</h1>
        <p className="text-xl text-black dark:text-gray-400 text-center">
          The page you are looking for is unavailable. You may have mistyped
          <br /> the address or the page may have moved.
        </p>
        <Button
          title="Go Back"
          onClick={() => {
            window.location.href = "/";
          }}
          className="w-60 bg-primary text-gray-900 font-bold"
          buttonPadding="p-2"
          buttonType="button"
        />
      </div>
    </div>
  );
};

export default NotFound;
