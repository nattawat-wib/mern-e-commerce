const cleanForm = (form, requireField) => {
    requireField.forEach(field => {
        if (!form[field]) throw `${field} is required!`;

        if (typeof form[field] === 'string') form[field] = form[field].trim();
    });

    for (const key in form) {
        if (!requireField.includes(key)) delete form[key]
    };
}

module.exports = cleanForm;