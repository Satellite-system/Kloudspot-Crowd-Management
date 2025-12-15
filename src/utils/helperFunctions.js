export function calculateGenderPercentage(data) {
  let totalMale = 0;
  let totalFemale = 0;

  data.forEach(item => {
    totalMale += Number(item.male || 0);
    totalFemale += Number(item.female || 0);
  });

  const total = totalMale + totalFemale;

  if (total === 0) {
    return {
      malePercentage: 0,
      femalePercentage: 0,
    };
  }

  return {
    malePercentage: Number(((totalMale / total) * 100).toFixed(2)),
    femalePercentage: Number(((totalFemale / total) * 100).toFixed(2)),
  };
}
