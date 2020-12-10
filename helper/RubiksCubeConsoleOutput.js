export default function consoleCube(cube) {
  console.log(`
          ${cube.up[0]}
          ${cube.up[1]}
          ${cube.up[2]}
  
    ${cube.left[0]} ${cube.front[0]} ${cube.right[0]} ${cube.back[0]}
    ${cube.left[1]} ${cube.front[1]} ${cube.right[1]} ${cube.back[1]}
    ${cube.left[2]} ${cube.front[2]} ${cube.right[2]} ${cube.back[2]}
  
          ${cube.down[0]}
          ${cube.down[1]}
          ${cube.down[2]}
    `);
}
