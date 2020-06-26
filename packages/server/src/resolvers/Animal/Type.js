const GenderType = {
  m: 'm',
  f: 'f'
};



const AgeGroup = {
  PRIMEIRO: (current) => {
    return {
      start: new Date(),
      end: new Date((new Date(current)).setMonth((new Date(current)).getMonth()-4))
    }
  },
  SEGUNDO: (current) => {
    return {
      start: new Date((new Date(current)).setMonth((new Date(current)).getMonth()-4)),
      end: new Date((new Date(current)).setMonth((new Date(current)).getMonth()-12))
    }
  },
  TERCEIRO: (current) => {
    return {
      start: new Date((new Date(current)).setMonth((new Date(current)).getMonth()-12)),
      end: new Date((new Date(current)).setMonth((new Date(current)).getMonth()-24))
    }
  },
  QUARTO: (current) => {
    return {
      start: new Date((new Date(current)).setMonth((new Date(current)).getMonth()-24)),
      end: new Date((new Date(current)).setMonth((new Date(current)).getMonth()-36))
    }
  },
  QUINTO: (current) => {
    return {
      start: new Date((new Date(current)).setMonth((new Date(current)).getMonth()-36)),
      end: new Date((new Date(current)).setMonth((new Date(current)).getMonth()-500))
    }
  }
};

module.exports = {
    GenderType,
    AgeGroup
};