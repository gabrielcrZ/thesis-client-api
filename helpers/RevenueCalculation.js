export const calculateOrderRevenue = (
  products,
  departureRegion,
  arrivalRegion
) => {
  const revenuePerKg = calculateRevenue(departureRegion, arrivalRegion);
  let revenue = 0;
  products.forEach((el) => {
    revenue += parseInt(el.productWeight) * revenuePerKg;
  });

  return revenue.toString();
};

const calculateRevenue = (departureRegion, arrivalRegion) => {
  switch (true) {
    case departureRegion === "Africa" && arrivalRegion === "Africa":
      return 100;
    case departureRegion === "Africa" && arrivalRegion === "Asia":
      return 150;
    case departureRegion === "Africa" && arrivalRegion === "Central America":
      return 250;
    case departureRegion === "Africa" && arrivalRegion === "Europe":
      return 200;
    case departureRegion === "Africa" && arrivalRegion === "Middle East":
      return 250;
    case departureRegion === "Africa" && arrivalRegion === "North America":
      return 300;
    case departureRegion === "Africa" && arrivalRegion === "Pacific":
      return 250;
    case departureRegion === "Africa" && arrivalRegion === "South America":
      return 300;
    case departureRegion === "Asia" && arrivalRegion === "Asia":
      return 100;
    case departureRegion === "Asia" && arrivalRegion === "Africa":
      return 150;
    case departureRegion === "Asia" && arrivalRegion === "Central America":
      return 300;
    case departureRegion === "Asia" && arrivalRegion === "Europe":
      return 200;
    case departureRegion === "Asia" && arrivalRegion === "Middle East":
      return 250;
    case departureRegion === "Asia" && arrivalRegion === "North America":
      return 250;
    case departureRegion === "Asia" && arrivalRegion === "Pacific":
      return 350;
    case departureRegion === "Asia" && arrivalRegion === "South America":
      return 150;
    case departureRegion === "Central America" &&
      arrivalRegion === "Central America":
      return 100;
    case departureRegion === "Central America" && arrivalRegion === "Africa":
      return 250;
    case departureRegion === "Central America" && arrivalRegion === "Asia":
      return 350;
    case departureRegion === "Central America" && arrivalRegion === "Europe":
      return 350;
    case departureRegion === "Central America" &&
      arrivalRegion === "Middle East":
      return 250;
    case departureRegion === "Central America" &&
      arrivalRegion === "North America":
      return 400;
    case departureRegion === "Central America" && arrivalRegion === "Pacific":
      return 250;
    case departureRegion === "Central America" &&
      arrivalRegion === "South America":
      return 200;
    case departureRegion === "Europe" && arrivalRegion === "Europe":
      return 100;
    case departureRegion === "Europe" && arrivalRegion === "Africa":
      return 250;
    case departureRegion === "Europe" && arrivalRegion === "Asia":
      return 250;
    case departureRegion === "Europe" && arrivalRegion === "Central America":
      return 350;
    case departureRegion === "Europe" && arrivalRegion === "Middle East":
      return 300;
    case departureRegion === "Europe" && arrivalRegion === "North America":
      return 400;
    case departureRegion === "Europe" && arrivalRegion === "Pacific":
      return 300;
    case departureRegion === "Europe" && arrivalRegion === "South America":
      return 350;
    case departureRegion === "Middle East" && arrivalRegion === "Middle East":
      return 100;
    case departureRegion === "Middle East" && arrivalRegion === "Africa":
      return 250;
    case departureRegion === "Middle East" && arrivalRegion === "Asia":
      return 300;
    case departureRegion === "Middle East" &&
      arrivalRegion === "Central America":
      return 350;
    case departureRegion === "Middle East" && arrivalRegion === "Europe":
      return 300;
    case departureRegion === "Middle East" && arrivalRegion === "North America":
      return 400;
    case departureRegion === "Middle East" && arrivalRegion === "Pacific":
      return 400;
    case departureRegion === "Middle East" && arrivalRegion === "South America":
      return 350;
    case departureRegion === "North America" &&
      arrivalRegion === "North America":
      return 100;
    case departureRegion === "North America" && arrivalRegion === "Africa":
      return 400;
    case departureRegion === "North America" && arrivalRegion === "Asia":
      return 300;
    case departureRegion === "North America" &&
      arrivalRegion === "Central America":
      return 250;
    case departureRegion === "North America" && arrivalRegion === "Europe":
      return 400;
    case departureRegion === "North America" && arrivalRegion === "Middle East":
      return 400;
    case departureRegion === "North America" && arrivalRegion === "Pacific":
      return 300;
    case departureRegion === "North America" &&
      arrivalRegion === "South America":
      return 200;
    case departureRegion === "Pacific" && arrivalRegion === "Pacific":
      return 100;
    case departureRegion === "Pacific" && arrivalRegion === "Africa":
      return 300;
    case departureRegion === "Pacific" && arrivalRegion === "Asia":
      return 350;
    case departureRegion === "Pacific" && arrivalRegion === "Central America":
      return 300;
    case departureRegion === "Pacific" && arrivalRegion === "Europe":
      return 350;
    case departureRegion === "Pacific" && arrivalRegion === "Middle East":
      return 250;
    case departureRegion === "Pacific" && arrivalRegion === "North America":
      return 200;
    case departureRegion === "Pacific" && arrivalRegion === "South America":
      return 250;
    case departureRegion === "South America" &&
      arrivalRegion === "South America":
      return 100;
    case departureRegion === "South America" && arrivalRegion === "Africa":
      return 250;
    case departureRegion === "South America" && arrivalRegion === "Asia":
      return 300;
    case departureRegion === "South America" &&
      arrivalRegion === "Central America":
      return 200;
    case departureRegion === "South America" && arrivalRegion === "Europe":
      return 350;
    case departureRegion === "South America" && arrivalRegion === "Middle East":
      return 400;
    case departureRegion === "South America" &&
      arrivalRegion === "North America":
      return 250;
    case departureRegion === "South America" && arrivalRegion === "Pacific":
      return 350;
    default:
      100;
  }
};
