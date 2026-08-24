export function get_age(birth_date_string: string) {
    const today = new Date();
    const birth_date = new Date(birth_date_string);

    let age = today.getFullYear() - birth_date.getFullYear();
    const month_difference = today.getMonth() - birth_date.getMonth();

    if (month_difference < 0 || (month_difference === 0 && today.getDate() < birth_date.getDate())) {
        age--;
    }

    return age;
}

export function get_graduation_status() {
    const college_age = get_age("5/10/25");
    switch (college_age) {
        case 0: return "sophomore Software Engineering student at";
        case 1: return "junior Software Engineering student at";
        case 3: return "senior Software Engineering student at";
        default: return "software engineer with a bachelors degree from";
    }
}