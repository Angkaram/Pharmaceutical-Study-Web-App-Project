// This validates the email domain (compare the email domain role to the dropdown role)
function ValidateDomain(email, role) {
    const emailDomain = {
        bavaria: "bavaria.org",
        fda: "fda.gov",
        admin: "janehopkins.admin",
        doctor: "janehopkins.org",
    };
    const domain = emailDomain[role];
    const regex = new RegExp(`^[a-z0-9._%+-]+@${domain}$`, "i");
    return regex.test(email);
}

export default ValidateDomain;