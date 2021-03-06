import AFRAME from 'aframe';
const THREE = AFRAME.THREE;

export default {
  schema: {
  },

  update: function () {
    
    this.el.addEventListener('object3dset', (event) => {
      if(event.target.object3D.children.length == 0) {
        console.log("[!] FBX with animation player has no children");
        return;
      }
      const model = event.target.object3D.children[0];
      this.mixer = new THREE.AnimationMixer(model);
      this.clips = model.animations;
      
      // Play all clips
      this.clips.forEach((clip) => {
        this.mixer.clipAction(clip).play();
      });
    });
  },
  resetAll: function() {
    this.clips.forEach((clip) => {
      this.mixer.clipAction(clip).reset();
      this.mixer.clipAction(clip).enabled = false;
    });
  },
  playAll: function() {
    this.clips.forEach((clip) => {
      this.mixer.clipAction(clip).play();
      this.mixer.clipAction(clip).enabled = true;
    });
  },
  tick: function (time, timeDelta) {
    if (this.mixer) {
      this.mixer.update(timeDelta / 1000);
    }
  }
};
