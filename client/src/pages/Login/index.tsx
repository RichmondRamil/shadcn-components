// DEPENDENCIES
export default function Login() {
  return (
    // Create a beautiful login page using daisy UI and tailwind CCSS
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-primary md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="/">Altus Digital</a>
          </div>

          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            Welcome to Altus Digital. Please login to your account.
          </p>

          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 my-4 text-base text-black transition duration-300 border-transparent rounded focus:border-primary focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 my-4 text-base text-black transition duration-300 border-transparent rounded focus:border-primary focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
          />

          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            <a href="/register">Don't have an account? Register here.</a>
          </p>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0 ">
            <a href="/forgot-password">Forgot your password?</a>
          </p>
        </div>
        <div className="bg-gradient-to-r from-secondary to-primary w-full"></div>
      </div>
    </div>
  );
}
