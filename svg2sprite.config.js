module.exports = [
  {
    target: 'svg/target/anron',
    output: 'svg/output/anron', 
    svgo: {
      plugins: [
        'removeDimensions',
        {
          name: "convertColors",
          params: {
            currentColor: true,
          }
        }
      ]
    }
  }
]