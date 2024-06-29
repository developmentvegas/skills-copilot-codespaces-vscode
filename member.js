function skillsMember() {
  return {
    skills: ['React.js', 'Vue.js', 'Angular.js'],
    showSkills: function() {
      this.skills.forEach((skill) => {
        console.log(`${this.name} knows ${skill}`);
      });
    }
  };
}