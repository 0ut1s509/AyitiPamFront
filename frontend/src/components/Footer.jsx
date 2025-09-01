const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 py-12 mt-16 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-av-blue-600">Ayiti</span> Pam Nan
            </h3>
            <p className="text-gray-600 mb-4">
              Your trusted platform for fact-checking information and celebrating positive stories from Haiti.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-600 hover:text-av-blue-600 transition-colors"
                >
                  Back to Top
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById('fact-checks');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-600 hover:text-av-blue-600 transition-colors"
                >
                  Fact-Checks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById('submit');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-600 hover:text-av-blue-600 transition-colors"
                >
                  Submit a Claim
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const element = document.getElementById('haiti-unveiled');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-600 hover:text-av-blue-600 transition-colors"
                >
                  Haiti Unveiled
                </button>
              </li>
            </ul>
          </div>

          {/* Contact/Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Involved</h4>
            <p className="text-gray-600 mb-4">
              Have a story to share? Want to contribute to our fact-checking efforts?
            </p>
            <p className="text-gray-600">
              Contact us: <span className="text-av-blue-600 font-medium">info@ayitipamnan.com</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Ayiti Pam Nan. Dedicated to truth and positive representation of Haiti.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;