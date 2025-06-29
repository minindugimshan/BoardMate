// PayHere Script Loader Utility
class PayHereLoader {
  constructor() {
    this.isLoaded = false;
    this.isLoading = false;
    this.retryCount = 0;
    this.maxRetries = 3;
    this.retryDelay = 2000; // 2 seconds
    this.scriptUrl = 'https://www.payhere.lk/lib/payhere.js';
  }

  // Check if PayHere is available
  isPayHereAvailable() {
    return typeof window !== 'undefined' && window.PayHere;
  }

  // Load PayHere script with retry logic
  async loadPayHere() {
    if (this.isLoaded || this.isLoading) {
      return this.isLoaded;
    }

    this.isLoading = true;

    return new Promise((resolve, reject) => {
      const loadScript = () => {
        // Check if script is already loaded
        if (this.isPayHereAvailable()) {
          this.isLoaded = true;
          this.isLoading = false;
          console.log('PayHere script already loaded');
          resolve(true);
          return;
        }

        // Check if script tag already exists
        const existingScript = document.querySelector(`script[src="${this.scriptUrl}"]`);
        if (existingScript) {
          // Script tag exists, wait for it to load
          this.waitForScriptLoad(resolve, reject);
          return;
        }

        // Create and load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scriptUrl;
        script.async = true;
        
        script.onload = () => {
          this.isLoaded = true;
          this.isLoading = false;
          console.log('PayHere script loaded successfully');
          resolve(true);
        };

        script.onerror = () => {
          this.isLoading = false;
          console.warn('PayHere script failed to load');
          reject(new Error('PayHere script failed to load'));
        };

        document.head.appendChild(script);
      };

      loadScript();
    });
  }

  // Wait for existing script to load
  waitForScriptLoad(resolve, reject) {
    const checkPayHere = () => {
      if (this.isPayHereAvailable()) {
        this.isLoaded = true;
        this.isLoading = false;
        console.log('PayHere script loaded successfully');
        resolve(true);
        return;
      }

      if (this.retryCount >= this.maxRetries) {
        this.isLoading = false;
        console.warn('PayHere script failed to load after maximum retries');
        reject(new Error('PayHere script failed to load'));
        return;
      }

      this.retryCount++;
      console.log(`Retrying PayHere script load (attempt ${this.retryCount}/${this.maxRetries})`);
      
      setTimeout(checkPayHere, this.retryDelay);
    };

    // Start checking
    checkPayHere();
  }

  // Get PayHere instance safely
  getPayHere() {
    if (!this.isPayHereAvailable()) {
      throw new Error('PayHere is not available. Please ensure the script is loaded.');
    }
    return window.PayHere;
  }
}

// Create singleton instance
const payHereLoader = new PayHereLoader();

export default payHereLoader; 