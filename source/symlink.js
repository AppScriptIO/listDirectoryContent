"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.createSymlink = createSymlink;const filesystem = require('fs');
const path = require('path');

function createSymlink(symlinkTarget) {
  for (const target of symlinkTarget) {
    try {
      let destinationStat = filesystem.existsSync(target.destination) && filesystem.lstatSync(target.destination);

      filesystem.mkdirSync(path.dirname(target.destination), { recursive: true });

      if (destinationStat) {
        if (destinationStat.isSymbolicLink()) filesystem.unlinkSync(target.destination);else

          if (destinationStat.isFile()) {
            let originalPath = `${target.destination}.original`;
            if (filesystem.existsSync(originalPath)) filesystem.unlinkSync(target.destination);
            filesystem.renameSync(target.destination, originalPath);
          }
      }
      filesystem.symlinkSync(target.source, target.destination);
      console.log(`✔ Symlink created: ${target.source} --> ${target.destination}`);
    } catch (error) {
      console.log(`❌ Symlink failed: ${target.source} --> ${target.destination}`);
      console.log(error);
    }
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9zeW1saW5rLmpzIl0sIm5hbWVzIjpbImZpbGVzeXN0ZW0iLCJyZXF1aXJlIiwicGF0aCIsImNyZWF0ZVN5bWxpbmsiLCJzeW1saW5rVGFyZ2V0IiwidGFyZ2V0IiwiZGVzdGluYXRpb25TdGF0IiwiZXhpc3RzU3luYyIsImRlc3RpbmF0aW9uIiwibHN0YXRTeW5jIiwibWtkaXJTeW5jIiwiZGlybmFtZSIsInJlY3Vyc2l2ZSIsImlzU3ltYm9saWNMaW5rIiwidW5saW5rU3luYyIsImlzRmlsZSIsIm9yaWdpbmFsUGF0aCIsInJlbmFtZVN5bmMiLCJzeW1saW5rU3luYyIsInNvdXJjZSIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciJdLCJtYXBwaW5ncyI6ImlIQUFBLE1BQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBMUI7QUFDQSxNQUFNQyxJQUFJLEdBQUdELE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUVPLFNBQVNFLGFBQVQsQ0FBdUJDLGFBQXZCLEVBQXNDO0FBQzNDLE9BQUssTUFBTUMsTUFBWCxJQUFxQkQsYUFBckIsRUFBb0M7QUFDbEMsUUFBSTtBQUNGLFVBQUlFLGVBQWUsR0FBR04sVUFBVSxDQUFDTyxVQUFYLENBQXNCRixNQUFNLENBQUNHLFdBQTdCLEtBQTZDUixVQUFVLENBQUNTLFNBQVgsQ0FBcUJKLE1BQU0sQ0FBQ0csV0FBNUIsQ0FBbkU7O0FBRUFSLE1BQUFBLFVBQVUsQ0FBQ1UsU0FBWCxDQUFxQlIsSUFBSSxDQUFDUyxPQUFMLENBQWFOLE1BQU0sQ0FBQ0csV0FBcEIsQ0FBckIsRUFBdUQsRUFBRUksU0FBUyxFQUFFLElBQWIsRUFBdkQ7O0FBRUEsVUFBSU4sZUFBSixFQUFxQjtBQUNuQixZQUFJQSxlQUFlLENBQUNPLGNBQWhCLEVBQUosRUFBc0NiLFVBQVUsQ0FBQ2MsVUFBWCxDQUFzQlQsTUFBTSxDQUFDRyxXQUE3QixFQUF0Qzs7QUFFSyxjQUFJRixlQUFlLENBQUNTLE1BQWhCLEVBQUosRUFBOEI7QUFDakMsZ0JBQUlDLFlBQVksR0FBSSxHQUFFWCxNQUFNLENBQUNHLFdBQVksV0FBekM7QUFDQSxnQkFBSVIsVUFBVSxDQUFDTyxVQUFYLENBQXNCUyxZQUF0QixDQUFKLEVBQXlDaEIsVUFBVSxDQUFDYyxVQUFYLENBQXNCVCxNQUFNLENBQUNHLFdBQTdCO0FBQ3pDUixZQUFBQSxVQUFVLENBQUNpQixVQUFYLENBQXNCWixNQUFNLENBQUNHLFdBQTdCLEVBQTBDUSxZQUExQztBQUNEO0FBQ0Y7QUFDRGhCLE1BQUFBLFVBQVUsQ0FBQ2tCLFdBQVgsQ0FBdUJiLE1BQU0sQ0FBQ2MsTUFBOUIsRUFBc0NkLE1BQU0sQ0FBQ0csV0FBN0M7QUFDQVksTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWEsc0JBQXFCaEIsTUFBTSxDQUFDYyxNQUFPLFFBQU9kLE1BQU0sQ0FBQ0csV0FBWSxFQUExRTtBQUNELEtBaEJELENBZ0JFLE9BQU9jLEtBQVAsRUFBYztBQUNkRixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBYSxxQkFBb0JoQixNQUFNLENBQUNjLE1BQU8sUUFBT2QsTUFBTSxDQUFDRyxXQUFZLEVBQXpFO0FBQ0FZLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxLQUFaO0FBQ0Q7QUFDRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZmlsZXN5c3RlbSA9IHJlcXVpcmUoJ2ZzJylcclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN5bWxpbmsoc3ltbGlua1RhcmdldCkge1xyXG4gIGZvciAoY29uc3QgdGFyZ2V0IG9mIHN5bWxpbmtUYXJnZXQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBkZXN0aW5hdGlvblN0YXQgPSBmaWxlc3lzdGVtLmV4aXN0c1N5bmModGFyZ2V0LmRlc3RpbmF0aW9uKSAmJiBmaWxlc3lzdGVtLmxzdGF0U3luYyh0YXJnZXQuZGVzdGluYXRpb24pXHJcblxyXG4gICAgICBmaWxlc3lzdGVtLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUodGFyZ2V0LmRlc3RpbmF0aW9uKSwgeyByZWN1cnNpdmU6IHRydWUgfSkgLy8gbWFrZSBkaXJlY3RvcnkgcmVjdXJzaXZlXHJcblxyXG4gICAgICBpZiAoZGVzdGluYXRpb25TdGF0KSB7XHJcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uU3RhdC5pc1N5bWJvbGljTGluaygpKSBmaWxlc3lzdGVtLnVubGlua1N5bmModGFyZ2V0LmRlc3RpbmF0aW9uKVxyXG4gICAgICAgIC8vIGRlbGV0ZSBleGlzdGluZyBzeW1saW5rIG9yIGZpbGVcclxuICAgICAgICBlbHNlIGlmIChkZXN0aW5hdGlvblN0YXQuaXNGaWxlKCkpIHtcclxuICAgICAgICAgIGxldCBvcmlnaW5hbFBhdGggPSBgJHt0YXJnZXQuZGVzdGluYXRpb259Lm9yaWdpbmFsYFxyXG4gICAgICAgICAgaWYgKGZpbGVzeXN0ZW0uZXhpc3RzU3luYyhvcmlnaW5hbFBhdGgpKSBmaWxlc3lzdGVtLnVubGlua1N5bmModGFyZ2V0LmRlc3RpbmF0aW9uKVxyXG4gICAgICAgICAgZmlsZXN5c3RlbS5yZW5hbWVTeW5jKHRhcmdldC5kZXN0aW5hdGlvbiwgb3JpZ2luYWxQYXRoKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBmaWxlc3lzdGVtLnN5bWxpbmtTeW5jKHRhcmdldC5zb3VyY2UsIHRhcmdldC5kZXN0aW5hdGlvbikgLy8gY3JlYXRlIHN5bWxpbmtcclxuICAgICAgY29uc29sZS5sb2coYOKclCBTeW1saW5rIGNyZWF0ZWQ6ICR7dGFyZ2V0LnNvdXJjZX0gLS0+ICR7dGFyZ2V0LmRlc3RpbmF0aW9ufWApXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhg4p2MIFN5bWxpbmsgZmFpbGVkOiAke3RhcmdldC5zb3VyY2V9IC0tPiAke3RhcmdldC5kZXN0aW5hdGlvbn1gKVxyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19