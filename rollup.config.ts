import typescript from '@rollup/plugin-typescript';
import { RollupOptions } from 'rollup';

export default {
    input: 'src/index.ts',
    output: {
        //为生成的js文件添加cli必须
        banner: '#!/usr/bin/env node',
        file: 'bin/lgt.js',
        format: 'cjs'
    },
    plugins: [
        typescript({ module: "ESNext" })
    ]
} as RollupOptions