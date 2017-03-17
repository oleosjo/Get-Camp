import Ember from 'ember';

export default Ember.Component.extend({
  campsitePhotos: Ember.inject.service(),

  tagName: 'div',

  loadPhotos: Ember.observer('photos', function() {
      if (this.get('photos')) {
        Ember.run.next(this, function() {
          // Clear the element
          let $el = Ember.$(this.get('element'));
          $el.empty();

          // Create owl slider dom and append images
          let $owlDom = Ember.$('<div class="owl-carousel owl-theme"/>');
          this.get('photos').forEach((url)=>{
            let $img = Ember.$('<img class="ui rounded image" src="'+url+'"/>');
            $owlDom.append($img);
          });

          $el.append($owlDom);

          let $owl = Ember.$('.owl-carousel');
          $owl.owlCarousel({
            loop: true,
            items: 1,
            dots: true,
          });
        });
      }
  })
});
