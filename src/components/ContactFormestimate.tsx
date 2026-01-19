import { useState, useEffect } from "react";
import { actions } from "astro:actions";
import "../styles/global.css";
import { queryWordPress } from "../lib/wordpress";

const QURYDATA = `
query Estimatespage {
  page(id: "request-a-free-estimate-form", idType: URI) {
    requestAEstimate{
      formTitle
      formDesc
    }

  }
}
`;

export default function ContactForm() {
    const [status, setStatus] = useState("");
    const [content, setContent] = useState({
        formTitle: "Connect With Us",
        getConnectTittle: "We'd love to hear from you.",
        formDesc: ""
    });

   useEffect(() => {
    async function fetchPageData() {
        try {
            const pagaedata = await queryWordPress(QURYDATA);
            
            // FIX: Match the property name in your GraphQL query
            const formData = pagaedata?.page?.requestAEstimate; 

            if (formData) {
                setContent({
                    formTitle: formData.formTitle || "Connect With Us",
                    formDesc: formData.formDesc || "",
                    getConnectTittle: "We'd love to hear from you.", // This isn't in your query, so keep default
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
        const form = e.currentTarget;
        setStatus("Sending...");

        const formData = new FormData(form);
        
        // Match these keys exactly with the Zod schema in index.ts
        const data = {
            firstname: formData.get("firstname") as string,
            lastname: formData.get("lastname") as string,
            email: formData.get("email") as string,
            streetAddress: formData.get("StreetAddress") as string,
            townCity: formData.get("TownCity") as string,
            phone: formData.get("Phone") as string,
            product: formData.get("product") as string,
            hearAboutUs: formData.get("Hearaboutus") as string,
            promoCode: formData.get("PromoCode") as string,
            message: formData.get("message") as string,
        };

        // console.log("finaldata", data);
        

        try {
            const { error } = await actions.sendEmailestimateemail(data);
            if (error) {
                setStatus("❌ Error sending message. Please check all fields.");
                return;
            }

            const { error: thankYouError } = await actions.sendThankYouEmailestimate(data);
            if (thankYouError) {
                setStatus("⚠️ Message received, but confirmation email failed.");
            } else {
                setStatus("✅ Thank you! Our team will contact you soon.");
                form.reset();
            }
        } catch (err) {
            setStatus("❌ An unexpected error occurred.");
        }
    };

    return (
        <div className="contactform-holders data-estimate">
            <div className="centerdata-form">
                <h4 className="fs-30">{content.formTitle}</h4>
                {content.formDesc && (
                    <div
                        className="connect-desc"
                        dangerouslySetInnerHTML={{ __html: content.formDesc }}
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
                    <div className="col-md-6">
                        <div className="univers-input">
                            <input type="text" name="StreetAddress" placeholder="Street Address" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="univers-input">
                            <input type="text" name="TownCity" placeholder="Town/City" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="univers-input">
                            <input type="text" name="Phone" placeholder="Phone" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="univers-input">
                            <input type="email" name="email" placeholder="Your Email" required />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="univers-input">
                            <select name="product" required>
                                <option value="Products">Products</option>
                                <option value="Cedar/Wood Fence">Cedar Fences</option>
                                <option value="Vinyl Fence">Vinyl Fence</option>
                                <option value="Chain Link Fence">Chain-Link Fence</option>
                                <option value="Aluminum Fence">Aluminum Fence</option>
                                <option value="Swimming Pool Enclosure">Swimming Pool Enclosure</option>
                                <option value="Post & Rail">Post & Rail</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="univers-input">
                            <input type="text" name="Hearaboutus" placeholder="How Did You Hear About Us?" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="univers-input">
                            <input type="text" name="PromoCode" placeholder="Promo Code" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="univers-input">
                            <textarea name="message" placeholder="Your Message" rows={5} />
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

            {status && <p style={{ marginTop: "15px", fontWeight: "bold" }}>{status}</p>}
        </div>
    );
}