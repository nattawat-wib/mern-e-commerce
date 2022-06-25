const cleanForm = (form, requireField) => {
    requireField.forEach(field => {
        if (!form[field]) throw `${field} is required!`;
    });
    
    for (const key in form) {
        if (!requireField.includes(key)) delete form[key]
    };
}

module.exports = cleanForm;