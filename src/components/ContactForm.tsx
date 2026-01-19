import { useState, useEffect } from "react";
import { actions } from "astro:actions";
import "../styles/global.css";
import { queryWordPress } from "../lib/wordpress";

// 1. Added connectUsDesc to the query
const QURYDATA = `
query Contactus {
  page(id: "contact", idType: URI) {
    contactUs {
      contactFormTitle
      getConnectTittle
      connectUsDesc
    }
  }
}
`;

export default function ContactForm() {
  const [status, setStatus] = useState("");
  // 2. Updated state structure to match your JSON data keys
  const [content, setContent] = useState({
    contactFormTitle: "Connect With Us",
    getConnectTittle: "We'd love to hear from you.",
    connectUsDesc: ""
  });

  useEffect(() => {
    async function fetchPageData() {
      try {
        const pagaedata = await queryWordPress(QURYDATA);
        if (pagaedata?.page?.contactUs) {
          // 3. Set the state using the exact keys from WordPress
          setContent({
            contactFormTitle: pagaedata.page.contactUs.contactFormTitle,
            getConnectTittle: pagaedata.page.contactUs.getConnectTittle,
            connectUsDesc: pagaedata.page.contactUs.connectUsDesc,
          });
        }
      } catch (error) {
        console.error("Error fetching WordPress data:", error);
      }
    }
    fetchPageData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // Capture the form reference
    setStatus("Sending...");
    
    const formData = new FormData(form);
    const data = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const { error } = await actions.sendEmail(data);
      if (error) {
        setStatus("❌ Error sending message. Please try again.");
        return;
      }

      const { error: thankYouError } = await actions.sendThankYouEmail(data);
      if (thankYouError) {
        setStatus("❌ Error sending confirmation.");
      } else {
        setStatus("✅ Thank you! A confirmation email has been sent to you.");
        
        // --- THIS CLEARS THE FORM ---
        form.reset(); 
      }
    } catch (err) {
      setStatus("❌ An unexpected error occurred.");
    }
  };
  return (
    <div className="contactform-holders">
      <div className="centerdata-form">
        {/* 4. Displaying the fields correctly */}
        <h4 className="fs-30">{content.contactFormTitle}</h4>
        
        {/* Display connectUsDesc if it exists */}
        {content.connectUsDesc && (
          <div 
            className="connect-desc" 
            dangerouslySetInnerHTML={{ __html: content.connectUsDesc }} 
          />
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="univers-input">
              <input type="text" name="firstname" placeholder="First Name" required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="univers-input">
              <input type="text" name="lastname" placeholder="Last Name" required />
            </div>
          </div>
          <div className="col-md-12">
            <div className="univers-input">
              <input type="email" name="email" placeholder="Your Email" required />
            </div>
          </div>
          <div className="col-md-12">
            <div className="univers-input">
              <textarea name="message" placeholder="Your Message" rows={5}  />
            </div>
          </div>
          <div className="col-md-12">
            <div className="submit-button">
              <button type="submit" className="submite-button">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </form>

      {status && <p style={{ marginTop: "15px" }}>{status}</p>}
    </div>
  );
}