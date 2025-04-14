"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recap = Recap;
const React = __importStar(require("react"));
const components_1 = require("@react-email/components");
const arccode_core_1 = require("arccode-core");
function Recap({ period, name, levelUpCount, keywordRegistry, levelUpKeywordRegistry, }) {
    const allKeywords = (0, arccode_core_1.getKeywords)(keywordRegistry)
        .sort((a, b) => b.count - a.count)
        .filter((_, i) => i < 12);
    return (<components_1.Html>
      <components_1.Head />
      <components_1.Preview>
        Your
        {' '}
        {period}
        {' '}
        recap. You leveled up
        {levelUpCount > 1 ? ` ${levelUpCount} times!` : '!'}
      </components_1.Preview>
      <components_1.Tailwind>
        <components_1.Body className="font-sans">
          <components_1.Container className="mx-auto py-4">
            <components_1.Link href="https://arccode.dev">
              <components_1.Row>
                <components_1.Column className="w-0">
                  <components_1.Img src="https://arccode.dev/images/logo-blue.png" alt="Arccode logo" height={32}/>
                </components_1.Column>
                <components_1.Column>
                  <div className="ml-2 text-lg font-semibold text-blue-500">
                    Arccode
                  </div>
                </components_1.Column>
              </components_1.Row>
            </components_1.Link>
            <div className="mt-4 text-2xl font-semibold">
              {name}
              , you leveled up
              {levelUpCount > 1 ? ` ${levelUpCount} times!` : '!'}
            </div>
            <div className="mt-4">
              Here is a summary of your progress:
            </div>
            {allKeywords.map(keyword => {
            var _a, _b;
            return (<div key={keyword.language + keyword.name} className="mt-4 py-2 px-4 border border-neutral-200 rounded font-mono" style={{ borderStyle: 'solid' }}>
                <components_1.Row>
                  <components_1.Column className="w-4">
                    <components_1.Img src={`https://arccode.dev/images/languages/${keyword.language}.png`} alt={keyword.language} width={16}/>
                  </components_1.Column>
                  <components_1.Column className="w-0">
                    <div className="ml-4">
                      {keyword.name}
                    </div>
                  </components_1.Column>
                  <components_1.Column>
                    {((_b = (_a = levelUpKeywordRegistry[keyword.language]) === null || _a === void 0 ? void 0 : _a[keyword.name]) !== null && _b !== void 0 ? _b : 0) > 0 && (<div className="ml-4 text-blue-500 text-xs font-sans">
                        Level up!
                      </div>)}
                  </components_1.Column>
                  <components_1.Column className="text-right">
                    {keyword.count}
                  </components_1.Column>
                </components_1.Row>
              </div>);
        })}
            <div className="pt-[26px] text-center">
              <components_1.Link href="https://arccode.dev/~" className="py-3 px-4 bg-blue-500 text-white text-sm rounded cursor-pointer">
                Open my loot box
                {levelUpCount > 1 ? 'es' : ''}
                !
              </components_1.Link>
            </div>
            <div className="mt-12 text-center text-xs text-neutral-500">
              Arccode is open source!
              {' '}
              <components_1.Link href="https://github.com/dherault/arccode">
                GitHub
              </components_1.Link>
            </div>
          </components_1.Container>
        </components_1.Body>
      </components_1.Tailwind>
    </components_1.Html>);
}
Recap.PreviewProps = {
    period: 'daily',
    name: 'Chancellor',
    levelUpCount: 2,
    keywordRegistry: {
        javascript: {
            const: 24,
            function: 16,
        },
        ruby: {
            def: 6,
            end: 3,
        },
    },
    levelUpKeywordRegistry: {
        javascript: {
            function: 2,
        },
        ruby: {
            def: 1,
        },
    },
};
exports.default = Recap;
//# sourceMappingURL=Recap.jsx.map