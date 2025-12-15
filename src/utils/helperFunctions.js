export function calculateGenderPercentage(data) {
  let totalMale = 0;
  let totalFemale = 0;

  data.forEach((item) => {
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

export function getUtcDayRange(dateInput) {
  const date = new Date(dateInput);

  // Start of day (UTC)
  const startUtc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    0,
    0,
    0,
    0
  );

  // End of day (UTC)
  const endUtc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    23,
    59,
    59,
    999
  );

  return {
    fromUtc: startUtc,
    toUtc: endUtc,
  };
}
