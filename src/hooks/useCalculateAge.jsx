export function calculateAge(birthDate) {
    const [birthDay, birthMonth, birthYear] = birthDate.split('-').map(Number)
  
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth() + 1
    const currentDay = today.getDate()
  
    let age = currentYear - birthYear
  
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--
    }
  
    return age
}